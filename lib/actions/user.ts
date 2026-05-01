"use server"

import prisma from "@/lib/prisma"
import { hash } from "bcrypt"
import { revalidatePath } from "next/cache"
import { USERS_PER_PAGE } from "@/config/constants"

const table = "user"

// GET ONE
// Because Session returns ID as string, we need to parse it to integer
export async function getUser(id: string) {

  try {
    const user = await prisma[table].findFirst({
      where: {
        id: +id
      }
    })

    return {
      success: true,
      payload: user
    }

  } catch (error) {
    return {
      success: false,
      payload: null,
      message: "Failed to get user"
    }
  }
  
}

// GET ALL (paginated)
export async function getUsers(page: number = 1, perPage: number = USERS_PER_PAGE) {

  try {
    const skip = (page - 1) * perPage
    const [users, total] = await prisma.$transaction([
      prisma[table].findMany({
        where: { deletedAt: null },
        skip,
        take: perPage,
        orderBy: { id: 'asc' },
      }),
      prisma[table].count({ where: { deletedAt: null } }),
    ])

    return {
      success: true,
      payload: users,
      total,
      totalPages: Math.max(1, Math.ceil(total / perPage)),
    }

  } catch (error) {
    return {
      success: false,
      payload: null,
      total: 0,
      totalPages: 1,
      message: "Failed to get users"
    }
  }

}

// CREATE
export async function createUser(_prevState: any, formData: FormData) {

  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const password = formData.get("password")?.toString().trim()
  const role = formData.get("role")?.toString().trim() || "USER"
  const validRoles = ["SUPERADMIN", "ADMIN", "USER"]
  const safeRole = validRoles.includes(role) ? role : "USER"

  // Check for missing required fields
  const requiredFields = ["name", "email", "password"] as const
  type Field = typeof requiredFields[number]
  let errors: { [key in Field]?: string } = {}
  requiredFields.forEach((field) => {
    if (!formData.get(field)?.toString().trim()) {
      errors[field] = `${field} is required.`
    }
  })

  // Has error, return data
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      input: {
        name,
        email,
      }
    }
  }

  try {

    // Check if email already exists
    const userExist = await prisma[table].findFirst({
      where: {
        email: email,
      },
    })

    // If email already exists, return error
    if (userExist) {
      return { 
        success: false, 
        message: [`Email ${email} already exists.`],
        input: {
          name,
          email,
        }
      }
    }

    // Create user
    const user = await prisma[table].create({
      data: {
        name,
        email,
        password: await hash(password, 12),
        role: safeRole as any,
      }
    })

    // Revalidate route cache
    revalidatePath("/dashboard/users")

    return {
      success: true,
      message: "User created successfully",
      payload: user
    }

  } catch (error) {
    return {
      success: false,
      payload: null,
      message: "Failed to create user"
    }
  }
  
}

// SOFT DELETE
export async function softDeleteUser(id: string) {

  try {
    const user = await prisma[table].update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() }
    })

    revalidatePath("/dashboard/users")

    return {
      success: true,
      payload: user
    }

  } catch (error) {
    return {
      success: false,
      payload: null,
      message: "Failed to delete user"
    }
  }

}

// UPDATE
export async function updateUser(_prevState: any, formData: FormData) {

  const id = formData.get("id")?.toString().trim()
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const role = formData.get("role")?.toString().trim() || "USER"
  const validRoles = ["SUPERADMIN", "ADMIN", "USER"]
  const safeRole = validRoles.includes(role) ? role : "USER"

  let errors: Record<string, string> = {}
  if (!name) errors.name = "Name is required."
  if (!email) errors.email = "Email is required."

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, input: { id, name, email, role } }
  }

  try {
    const userExist = await prisma[table].findFirst({
      where: { email, NOT: { id: parseInt(id!) } }
    })

    if (userExist) {
      return {
        success: false,
        message: `Email ${email} is already in use.`,
        input: { id, name, email, role }
      }
    }

    const user = await prisma[table].update({
      where: { id: parseInt(id!) },
      data: { name, email, role: safeRole as any, updatedAt: new Date() }
    })

    revalidatePath("/dashboard/users")

    return {
      success: true,
      message: "User updated successfully.",
      payload: user
    }

  } catch (error) {
    return {
      success: false,
      payload: null,
      message: "Failed to update user."
    }
  }

}
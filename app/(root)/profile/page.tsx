import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/shared'
import { getUserSession } from '@/lib/get-user-session'
import { Routes } from '@/constants/route'

export default async function ProfilePage() {
  const session = await getUserSession()

  if (!session) {
    return redirect(Routes.NotAuth)
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(session?.id) },
  })

  if (!user) {
    return redirect(Routes.NotAuth)
  }

  return <ProfileForm data={user} />
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User, userService } from '@/lib/supabase'
import { Plus, MoreHorizontal, Edit, Trash2, Phone, User as UserIcon, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function UserManagement() {
  const t = useTranslations()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone_number: ''
  })

  const loadUsers = useCallback(async () => {
    try {
      const data = await userService.getAll()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
      toast.error(t('userManagement.loadUsersFailed'))
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const formatPhoneForStorage = (phone: string) => {
    // Store phone numbers as entered to maintain consistency
    // Remove any extra spaces or characters but keep dashes if present
    return phone.trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation - ensure phone number is not empty
    if (!formData.phone_number.trim()) {
      toast.error('전화번호를 입력하세요')
      return
    }

    const formattedPhone = formatPhoneForStorage(formData.phone_number)
    const userData = {
      name: formData.name,
      phone_number: formattedPhone
    }

    try {
      if (editingUser) {
        await userService.update(editingUser.id, userData)
        toast.success('사용자가 성공적으로 업데이트되었습니다')
      } else {
        await userService.create(userData)
        toast.success('사용자가 성공적으로 생성되었습니다')
      }
      
      setDialogOpen(false)
      resetForm()
      loadUsers()
    } catch (error: unknown) {
      console.error('Error saving user:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes('duplicate key')) {
        toast.error('전화번호가 이미 존재합니다')
      } else {
        toast.error('사용자 저장에 실패했습니다')
      }
    }
  }

  const formatPhoneForEdit = (phone: string) => {
    // Return phone number as-is for editing to maintain original format
    return phone
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      phone_number: formatPhoneForEdit(user.phone_number)
    })
    setDialogOpen(true)
  }

  const handleDelete = async (user: User) => {
    if (!confirm(`정말로 ${user.name}님을 삭제하시겠습니까?`)) return
    
    try {
      await userService.delete(user.id)
      toast.success('사용자가 성공적으로 삭제되었습니다')
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('사용자 삭제에 실패했습니다')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', phone_number: '' })
    setEditingUser(null)
  }

  const formatPhoneNumber = (phone: string) => {
    // Format Korean phone number for display - keep original format from database
    // If it's stored with +82- format, convert to 010 format
    if (phone.startsWith('+82-')) {
      return phone.replace(/^\+82-/, '0')
    }
    // Return as-is if already in correct format
    return phone
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">사용자 로딩 중...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>{t('userManagement.title')}</CardTitle>
              <CardDescription>
                {t('userManagement.subtitle')}
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="self-start sm:self-auto">
                  <Plus className="h-4 w-4 mr-2" />
{t('userManagement.addUser')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingUser ? t('userManagement.editUser') : t('userManagement.addUser')}
                    </DialogTitle>
                    <DialogDescription>
                      {t('userManagement.subtitle')}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">{t('userManagement.name')} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('userManagement.namePlaceholder')}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">{t('userManagement.phone')} *</Label>
                      <Input
                        id="phone"
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        placeholder={t('userManagement.phonePlaceholder')}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
{t('userManagement.phoneHelper')}
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
{t('userManagement.cancel')}
                    </Button>
                    <Button type="submit">
                      {editingUser ? t('userManagement.save') : t('userManagement.addUser')}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-12">
              <UserIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                {t('userManagement.noUsers')}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('userManagement.noUsersDescription')}
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
{t('userManagement.addFirstUser')}
              </Button>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">{t('userManagement.name')}</TableHead>
                        <TableHead className="min-w-[180px]">이메일</TableHead>
                        <TableHead className="min-w-[140px]">{t('userManagement.phone')}</TableHead>
                        <TableHead className="min-w-[80px]">{t('userManagement.status')}</TableHead>
                        <TableHead className="min-w-[100px]">{t('userManagement.createdAt')}</TableHead>
                        <TableHead className="text-right min-w-[80px]">{t('userManagement.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {user.email || '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {formatPhoneNumber(user.phone_number)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? "default" : "secondary"}>
                          {user.is_active ? t('userManagement.active') : t('userManagement.inactive')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.created_at ? formatDate(user.created_at) : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(user)}>
                              <Edit className="h-4 w-4 mr-2" />
{t('userManagement.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(user)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
{t('userManagement.delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

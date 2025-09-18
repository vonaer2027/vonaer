'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User, userService } from '@/lib/supabase'
import { Plus, MoreHorizontal, Edit, Trash2, Phone, User as UserIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone_number: ''
  })

  const loadUsers = async () => {
    try {
      const data = await userService.getAll()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
      toast.error('사용자 로드에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

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
              <CardTitle>사용자 관리</CardTitle>
              <CardDescription>
                VONAER 고객 계정 및 연락처 정보를 관리합니다
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="self-start sm:self-auto">
                  <Plus className="h-4 w-4 mr-2" />
사용자 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingUser ? '사용자 수정' : '새 사용자 추가'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingUser 
                        ? '아래에서 사용자 정보를 업데이트하세요.' 
                        : '아래에 사용자 세부 정보를 입력하세요.'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">이름 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="전체 이름을 입력하세요"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">전화번호 *</Label>
                      <Input
                        id="phone"
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        placeholder="01099343991 또는 010-9934-3992"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
전화번호를 입력하세요 (대시 포함 또는 제외)
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
취소
                    </Button>
                    <Button type="submit">
                      {editingUser ? '사용자 업데이트' : '사용자 생성'}
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
                사용자를 찾을 수 없습니다
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                첫 번째 사용자를 추가하여 시작하세요
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
첫 사용자 추가
              </Button>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">이름</TableHead>
                        <TableHead className="min-w-[140px]">연락처</TableHead>
                        <TableHead className="min-w-[80px]">상태</TableHead>
                        <TableHead className="min-w-[100px]">생성일</TableHead>
                        <TableHead className="text-right min-w-[80px]">작업</TableHead>
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
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {formatPhoneNumber(user.phone_number)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.is_active ? "default" : "secondary"}>
                          {user.is_active ? "활성" : "비활성"}
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
수정
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(user)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
삭제
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

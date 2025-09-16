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
      toast.error('Failed to load users')
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
      toast.error('Please enter a phone number')
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
        toast.success('User updated successfully')
      } else {
        await userService.create(userData)
        toast.success('User created successfully')
      }
      
      setDialogOpen(false)
      resetForm()
      loadUsers()
    } catch (error: unknown) {
      console.error('Error saving user:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes('duplicate key')) {
        toast.error('Phone number already exists')
      } else {
        toast.error('Failed to save user')
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
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return
    
    try {
      await userService.delete(user.id)
      toast.success('User deleted successfully')
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
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
            <p className="text-muted-foreground">Loading users...</p>
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
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage Vonaer customer accounts and contact information
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="self-start sm:self-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingUser ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingUser 
                        ? 'Update user information below.' 
                        : 'Enter the user details below.'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        placeholder="01099343991 or 010-9934-3992"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter phone number (with or without dashes)
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingUser ? 'Update User' : 'Create User'}
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
                No users found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by adding your first user
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First User
              </Button>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">Name</TableHead>
                        <TableHead className="min-w-[140px]">Contact</TableHead>
                        <TableHead className="min-w-[80px]">Status</TableHead>
                        <TableHead className="min-w-[100px]">Created</TableHead>
                        <TableHead className="text-right min-w-[80px]">Actions</TableHead>
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
                          {user.is_active ? "Active" : "Inactive"}
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
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(user)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
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

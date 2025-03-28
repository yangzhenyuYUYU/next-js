"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginDialog() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里添加登录逻辑
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">登录</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleLogin}>
          <DialogHeader>
            <DialogTitle>登录</DialogTitle>
            <DialogDescription>
              输入您的账号和密码进行登录
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                用户名
              </Label>
              <Input
                id="username"
                className="col-span-3"
                placeholder="请输入用户名"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                密码
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                placeholder="请输入密码"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">登录</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
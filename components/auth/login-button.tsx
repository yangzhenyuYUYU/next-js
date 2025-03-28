'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import { signIn } from 'next-auth/react';

export function LoginButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          登录
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>选择登录方式</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => handleLogin('google')}
            disabled={isLoading}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            使用 Google 登录
          </Button>
          <Button
            variant="outline"
            onClick={() => handleLogin('github')}
            disabled={isLoading}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            使用 GitHub 登录
          </Button>
          <Button
            variant="outline"
            onClick={() => handleLogin('wechat')}
            disabled={isLoading}
          >
            <Icons.wechat className="mr-2 h-4 w-4" />
            使用微信登录
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或者
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => handleLogin('email')}
            disabled={isLoading}
          >
            <Icons.mail className="mr-2 h-4 w-4" />
            使用邮箱登录
          </Button>
          <Button
            variant="outline"
            onClick={() => handleLogin('phone')}
            disabled={isLoading}
          >
            <Icons.phone className="mr-2 h-4 w-4" />
            使用手机号登录
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
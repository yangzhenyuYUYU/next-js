'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/ui/icons';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: string | null;
}

const paymentMethods = [
  {
    id: 'alipay',
    name: '支付宝',
    icon: Icons.alipay,
  },
  {
    id: 'wechat',
    name: '微信支付',
    icon: Icons.wechat,
  },
  {
    id: 'card',
    name: '银行卡',
    icon: Icons.card,
  },
];

export function PaymentDialog({ open, onOpenChange, tier }: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    try {
      // 这里添加实际的支付处理逻辑
      await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟支付过程
      onOpenChange(false);
      // 这里可以添加支付成功的提示
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>选择支付方式</DialogTitle>
          <DialogDescription>
            请选择您喜欢的支付方式完成购买
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="grid gap-4"
          >
            {paymentMethods.map((method) => (
              <div key={method.id}>
                <RadioGroupItem
                  value={method.id}
                  id={method.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={method.id}
                  className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex items-center space-x-2">
                    <method.icon className="h-5 w-5" />
                    <span>{method.name}</span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            取消
          </Button>
          <Button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
          >
            {isProcessing ? '处理中...' : '立即支付'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
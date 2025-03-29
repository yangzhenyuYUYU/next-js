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
import { useTranslations } from 'next-intl';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: string | null;
}

export function PaymentDialog({ open, onOpenChange, tier }: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use the useTranslations hook to get the t function for the "pricing.payment" namespace
  const t = useTranslations("pricing.payment");
  const methods = useTranslations("pricing.payment.methods");

  const paymentMethods = [
    {
      id: 'alipay',
      name: methods("alipay"),
      icon: Icons.alipay,
    },
    {
      id: 'wechat',
      name: methods("wechat"),
      icon: Icons.wechat,
    },
    {
      id: 'card',
      name: methods("card"),
      icon: Icons.card,
    },
  ];

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
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("description")}
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
            {t("cancel")}
          </Button>
          <Button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
          >
            {isProcessing ? t("processing") : t("pay_now")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
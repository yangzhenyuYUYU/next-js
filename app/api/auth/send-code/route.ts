import { NextResponse } from 'next/server';
import { verificationCodes } from '../[...nextauth]/options';

export async function POST(request: Request) {
    try {
        const { type, target } = await request.json();

        // 验证请求参数
        if (!type || !target) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        // 验证邮箱或手机号格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^1[3-9]\d{9}$/;

        if (type === 'email' && !emailRegex.test(target)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        if (type === 'phone' && !phoneRegex.test(target)) {
            return NextResponse.json(
                { error: 'Invalid phone number format' },
                { status: 400 }
            );
        }

        // 生成6位验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // 设置验证码有效期（5分钟）
        const expires = Date.now() + 5 * 60 * 1000;
        
        // 存储验证码
        verificationCodes.set(target, { code, expires });

        // TODO: 在实际应用中，这里应该调用邮件服务或短信服务发送验证码
        // 示例：
        // if (type === 'email') {
        //     await sendEmail(target, code);
        // } else {
        //     await sendSMS(target, code);
        // }

        // 开发环境下直接返回验证码
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                success: true,
                code: code, // 仅在开发环境下返回验证码
                message: 'Verification code sent to ' + target
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Verification code sent to ' + target
        });

    } catch (error) {
        console.error('Error sending verification code:', error);
        return NextResponse.json(
            { error: 'Failed to send verification code' },
            { status: 500 }
        );
    }
} 
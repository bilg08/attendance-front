import Button from '@/components/Button';
import Input from '@/components/Input';
import useUser from '@/global/user';
import useModal from '@/hooks/useModal';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';

function Auth() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState<'login' | 'register'>('login');
    const router = useRouter();
    const {onOpen, onClose} = useModal();
    const {setUser} = useUser();
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, []);
    const signin = useCallback(async() => {
        try {
             onOpen()
            const res = await axios.post(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/signin`,{
                email, password
            });
            setUser(res.data.data.user)
            toast.success('amjilttai');
            router.push('/');
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            onClose()
        }
    }, [email, password]);
    const signup = useCallback(async() => {
        try {
            onOpen()
            const res = await axios.post(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/signup`,{
                email, password, username
            });
            toast.success('amjilttai');
            setUser(res.data.data.user)
            router.push('/');
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            onClose()
        }
    }, [username, email, password]);
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {variant === 'login' ? 'Нэвтрэх' : 'Бүртгүүлэх'}
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            {variant === 'register' && (
                                <Input
                                    label='Username'
                                    type="text"
                                    value={username}
                                    onChange={(e: any) => setName(e.target.value)}
                                    placeholder="helloworld"
                                />
                            )}
                            <Input
                                label='Email'
                                value={email}
                                type='email'
                                placeholder='email@yahoo.com'
                                onChange={(e: any) => setEmail(e.target.value)}
                            />
                            <Input
                                label='password'
                                type="password"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <Button
                            onClick={variant === 'login' ? signin : signup}
                            >
                            {variant === 'login' ? 'Нэвтрэх': 'Бүртгүүлэх'}
                            </Button>
                            <p className="text-neutral-500 mt-12">
                                {variant === 'login' ? 'Бүртгэл үүсгэх үү' : 'Өөрийн хаягаараа орох'}
                                <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                    {variant === 'login' ? 'Бүртгэл үүсгэх' : 'Нэвтрэх'}
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth
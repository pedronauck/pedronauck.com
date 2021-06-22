import Image from 'next/image'
import { useRef } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useMutation } from 'react-query'
import { FiUser, FiMail } from 'react-icons/fi'
import { Button, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import mergeRefs from 'react-merge-refs'
import axios from 'axios'
import * as yup from 'yup'

import Input from 'components/Input'
import useAnalytics from 'hooks/useAnalytics'

const schema = yup.object().shape({
  email: yup.string().email().required('Email é obrigatório'),
  firstName: yup.string().required('Nome é obrigatório'),
})

export default function Content() {
  const toast = useToast()
  const seg = useAnalytics()
  const emailRef = useRef(null)
  const form = useForm({ resolver: yupResolver(schema) })
  const { control, handleSubmit, watch, reset } = form

  const subscribe = useMutation(
    async (contact) => {
      return axios.post('/api/subscribe', contact)
    },
    {
      onSuccess: ({ data: { contact } }) => {
        toast({
          position: 'top',
          isClosable: true,
          status: 'success',
          title: 'Email cadastrado com sucesso!',
        })
        seg.track('subscription_added', contact)
        reset({ firstName: '', email: '' })
      },
      onError: () => {
        const firstName = watch('firstName')
        const email = watch('email')
        seg.track('subscription_error', {
          firstName,
          email,
        })
        toast({
          position: 'top',
          isClosable: true,
          status: 'error',
          title: 'Oops, esse email já foi cadastro!',
        })
        reset({ firstName })
        emailRef.current.focus()
      },
    }
  )

  const onSubmit = async (values) => {
    emailRef.current.blur()
    seg.track('form_submitted', values)
    subscribe.mutate(values)
  }

  return (
    <div className="grid p-5 gap-5 sm:gap-0 sm:p-10 sm:h-screen sm:grid-rows-3">
      <div className="logo">
        <Image
          src="/logo.svg"
          alt="#BatePapoDev by Pedro Nauck"
          width={369}
          height={252}
        />
      </div>
      <div className="flex flex-col flex-start justify-center">
        <h2 className="text-6xl">Em breve</h2>
        <h3 className="text-6xl font-bold text-secondary">Novidades</h3>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Se inscreva e fique por dentro!</h3>
          <div className="mt-3">
            <Controller
              name="firstName"
              defaultValue=""
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Seu nome"
                    icon={<FiUser />}
                  />
                )
              }}
            />
          </div>
          <div className="mt-3">
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Seu email"
                    ref={mergeRefs([emailRef, field.ref])}
                    icon={<FiMail />}
                  />
                )
              }}
            />
          </div>
          <Button
            type="submit"
            className="mt-4"
            variant="default"
            isFullWidth
            isLoading={subscribe.isLoading}>
            Se inscrever
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

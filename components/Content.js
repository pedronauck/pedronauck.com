import Image from 'next/image'
import { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { FiUser, FiMail } from 'react-icons/fi'
import { Button, useToast } from '@chakra-ui/react'
import mergeRefs from 'react-merge-refs'
import axios from 'axios'
import * as yup from 'yup'

import Input from 'components/Input'

const schema = yup.object().shape({
  email: yup.string().email().label('Email').required(),
  firstName: yup.string().label('Name').required(),
})

export default function Content() {
  const toast = useToast()
  const emailRef = useRef(null)
  const { control, handleSubmit, formState, reset, watch } = useForm({
    resolver: yupResolver(schema),
  })

  const subscribe = useMutation(
    async (contact) => await axios.post('/api/subscribe', contact),
    {
      onSuccess: () => {
        toast({
          position: 'top',
          isClosable: true,
          status: 'success',
          title: 'Email cadastrado com sucesso!',
        })
        reset()
      },
      onError: () => {
        toast({
          position: 'top',
          isClosable: true,
          status: 'error',
          title: 'Oops, esse email já foi cadastro!',
        })
        reset({ firstName: watch('firstName') })
        emailRef.current.focus()
      },
    }
  )

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
        <h2 className="text-6xl">Quarta</h2>
        <h3 className="text-6xl font-bold text-secondary">às 19h30</h3>
      </div>
      <form onSubmit={handleSubmit(subscribe.mutate)}>
        <h3>Se inscreva, vagas limitadas!</h3>
        <div className="mt-3">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={<FiUser />}
                error={formState.errors.firstName}
                type="text"
                placeholder="Seu nome"
              />
            )}
          />
        </div>
        <div className="mt-3">
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  ref={mergeRefs([emailRef, field.ref])}
                  icon={<FiMail />}
                  error={formState.errors.email}
                  type="email"
                  name="email"
                  placeholder="Seu email"
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
    </div>
  )
}

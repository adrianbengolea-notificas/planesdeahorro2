'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useTransition } from 'react';
import { submitCase } from '@/actions/cases';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  whatsapp: z.string().regex(/^[0-9]{10,15}$/, { message: 'Ingrese un número de WhatsApp válido (solo números, sin + ni espacios).' }),
  administrator: z.string().min(2, { message: 'Por favor, ingrese la administradora.' }),
  planStatus: z.enum(['al_dia', 'en_mora', 'renunciado', 'finalizado'], { required_error: 'Por favor, seleccione el estado de su plan.' }),
  description: z.string().min(20, { message: 'Describa su caso con al menos 20 caracteres.' }).max(2000),
});

export function CaseForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      whatsapp: '',
      administrator: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await submitCase(values);
      if (result.success) {
        setIsSuccess(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar el formulario",
          description: result.error || "Hubo un problema al procesar su solicitud. Por favor, intente de nuevo.",
        })
      }
    });
  }

  if (isSuccess) {
    return (
      <Card className="bg-card shadow-lg text-center p-8 md:p-12">
        <h3 className="font-headline text-2xl text-primary mb-4">¡Gracias por su consulta!</h3>
        <p className="text-muted-foreground">Hemos recibido su información correctamente. Un especialista se pondrá en contacto con usted a través de WhatsApp a la brevedad.</p>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-lg">
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp (solo números)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 1150... (con código de área)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="administrator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Administradora del Plan</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Fiat Plan, Chevrolet Plan, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado del Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="al_dia">Al día</SelectItem>
                        <SelectItem value="en_mora">En mora (con deuda)</SelectItem>
                        <SelectItem value="renunciado">Renunciado / Rescindido</SelectItem>
                        <SelectItem value="finalizado">Finalizado (pagado)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción de su Caso</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa su problema, por ejemplo: el aumento de la cuota, problemas con la entrega, liquidación, etc."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar Evaluación Gratuita
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

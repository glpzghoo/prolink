'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  title: z.string().min(1, 'Гарчиг оруулна уу'),
  requirements: z.string().min(1, 'Дэлгэрэнгүй мэдээлэл оруулна уу'),
  salary: z.coerce.number().min(0, 'Цалин оруулна уу'),
  salaryRate: z.enum(['HOUR', 'DAY', 'MONTH']),
  exp: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddJobDialog() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      requirements: '',
      salary: 0,
      salaryRate: 'HOUR',
      exp: true,
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(values: FormValues) {
    setLoading(true);
    try {
      const res = await axios.post('/api/job/create', {
        ...values,
        selectedSkills: [],
      });
      if (res.data.success) {
        setOpen(false);
        router.push(`/job/${res.data.data.newJob.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className="p-2.5 bg-muted rounded-full hover:bg-accent transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          title="Шинэ зар нэмэт"
        >
          <PlusCircle className="text-primary text-xl" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Шинэ ажлын санал</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Гарчиг</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Цалин</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salaryRate"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Нэгж</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HOUR">Цагаар</SelectItem>
                        <SelectItem value="DAY">Өдрөөр</SelectItem>
                        <SelectItem value="MONTH">Сараар</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="exp"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="exp" />
                  </FormControl>
                  <FormLabel htmlFor="exp">Туршлага шаардах</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дэлгэрэнгүй</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Илгээж байна...' : 'Нийтлэх'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

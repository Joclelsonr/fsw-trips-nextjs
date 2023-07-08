"use client";

import React from "react";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import { differenceInDays } from "date-fns";

interface TripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  tripMaxGuests: number;
  pricePerDay: any;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

function TripReservation({
  tripStartDate,
  tripEndDate,
  tripMaxGuests,
  pricePerDay,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data de início é obrigatória",
            },
          }}
          control={control}
          render={({ field }: any) => (
            <DatePicker
              className="w-full"
              placeholderText="Data de Início"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              minDate={tripStartDate}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória",
            },
          }}
          control={control}
          render={({ field }: any) => (
            <DatePicker
              className="w-full"
              placeholderText="Data Final"
              onChange={field.onChange}
              selected={field.value}
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              minDate={startDate ?? tripStartDate}
              maxDate={tripEndDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório",
          },
        })}
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
        placeholder={`Número de hóspedes (max: ${tripMaxGuests})`}
        className="mt-4"
        type="number"
      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1
            : "R$0"}
        </p>
      </div>

      <div className="pb-10 border-b border-b-primaryGrayLight w-full">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mt-3 w-full"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
}

export default TripReservation;

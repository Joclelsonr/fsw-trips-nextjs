"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Button from "@/components/Button";
import { Trip } from "@prisma/client";
import { toast } from "react-toastify";

function TripConfirmation({
  params,
}: {
  params: { tripId: string; startDate: string; endDate: string };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    fetchTrip();
  }, [status]);

  const fetchTrip = async () => {
    const response = await fetch(`/api/trips`, {
      method: "POST",
      body: JSON.stringify({
        tripId: params.tripId,
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
      }),
    });
    const res = await response.json();

    if (res.error) return router.push("/");

    setTrip(res.trip);
    setTotalPrice(res.totalPrice);
  };

  if (!trip) return null;

  const handleBuyClick = async () => {
    const response = await fetch(`/api/trips/reservation`, {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          guests: Number(searchParams.get("guests")),
          userId: (data?.user as any)?.id,
          totalPaid: totalPrice,
        })
      ),
    });
    console.log(response);
    if (!response.ok)
      return toast.error("Ocorreu um erro ao realizar a reserva!", {
        position: "top-center",
      });

    router.push(`/`);
    toast.success("Reserva realizada com sucesso!", { position: "top-center" });
  };

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

      <div className="flex flex-col p-5 mt-5 border-primaryLight border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-primaryGray border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip?.coverImage!}
              fill
              style={{ objectFit: "cover" }}
              alt={trip?.name!}
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip?.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip?.countryCode!} svg />
              <p className="text-primaryGray text-xs underline">
                {trip?.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-primaryDarker my-3">
          Informações sobre o preço
        </h3>
        <div className="flex justify-between mt-1">
          <p className="text-primaryDarker">Total:</p>
          <p className="font-medium">R${totalPrice}</p>
        </div>
      </div>

      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-semibold">Data</h3>
        <div className="flex items-center gap-1 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {" - "}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}

export default TripConfirmation;

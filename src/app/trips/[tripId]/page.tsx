import React from "react";
import { prisma } from "@/lib/prisma";

import TripDetailHeader from "./confirmation/components/TripDetailHeader";
import TripReservation from "./confirmation/components/TripReservation";
import TripDescription from "./confirmation/components/TripDescription";
import TripHighlights from "./confirmation/components/TripHighlights";
import TripLocation from "./confirmation/components/TripLocation";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });
  return trip;
};

async function TripDetails({ params }: { params: { tripId: string } }) {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="container mx-auto">
      <TripDetailHeader trip={trip} />
      <TripReservation
        tripId={trip.id}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
        tripMaxGuests={trip.maxGuests}
        pricePerDay={trip.pricePerDay}
      />
      <TripDescription description={trip.description!} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
}

export default TripDetails;

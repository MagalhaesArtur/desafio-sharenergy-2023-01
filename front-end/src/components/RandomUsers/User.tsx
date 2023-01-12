import {
  Calendar,
  Envelope,
  MapPin,
  Person,
  Phone,
  User,
} from "phosphor-react";
import { useState } from "react";

export function UserData(props: { user: any }) {
  const [currentInformation, setCurrentInformation] = useState(Object);

  return (
    <div className="flex items-center relative h-[100%] w-[100%] flex-col bg-[#d0d3d4] justify-center">
      <div className="h-[30%] border-b-2 w-[100%] border-gray-500"></div>
      <div className="h-[70%] flex flex-col justify-start mt-20 items-center  w-[100%] ">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-slate-500 text-lg font-semibold">
            {currentInformation.information}
          </h2>
          <h2 className="text-3xl text-black font-bold">
            {currentInformation.data}
          </h2>
        </div>
        <div className="flex mt-5 items-center gap-4">
          <Person
            size={36}
            weight="light"
            onMouseEnter={() => {
              setCurrentInformation({
                information: "Hi, my name is:",

                data: props.user.name.first + " " + props.user.name.last,
              });
            }}
            className="text-[#575252] hover:text-green-500  transition-all"
          />
          <Envelope
            size={36}
            className="text-[#575252] hover:text-green-500  transition-all"
            onMouseEnter={() => {
              setCurrentInformation({
                information: "My email address is:",

                data: props.user.email,
              });
            }}
            weight="light"
          />
          <Calendar
            onMouseEnter={() => {
              setCurrentInformation({
                information: "My birthday is:",

                data:
                  props.user.dob.date.slice(5, 7) +
                  "/" +
                  props.user.dob.date.slice(8, 10) +
                  "/" +
                  props.user.dob.date.slice(0, 4),
              });
            }}
            size={36}
            className="text-[#575252] hover:text-green-500  transition-all"
            weight="light"
          />
          <MapPin
            onMouseEnter={() => {
              setCurrentInformation({
                information: "My address is:",

                data:
                  String(props.user.location.street.number) +
                  " " +
                  props.user.location.street.name +
                  ", " +
                  props.user.location.country,
              });
            }}
            size={36}
            className="text-[#575252] hover:text-green-500  transition-all"
            weight="light"
          />
          <Phone
            onMouseEnter={() => {
              setCurrentInformation({
                information: "My phone number is:",

                data: props.user.cell,
              });
            }}
            size={36}
            className="text-[#575252] hover:text-green-500  transition-all"
            weight="light"
          />
          <User
            onMouseEnter={() => {
              setCurrentInformation({
                information: "My username is:",

                data: props.user.login.username,
              });
            }}
            size={36}
            className="text-[#575252] hover:text-green-500  transition-all"
            weight="light"
          />
        </div>
      </div>
      <img
        src={`${props.user.picture.large}`}
        className="absolute p-1 outline outline-1 outline-gray-500 top-16 rounded-full"
        alt=""
      />
    </div>
  );
}

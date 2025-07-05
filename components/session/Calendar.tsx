"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useState } from "react";
import CreateSessionForm from "../../app/(admin)/admin/sessions/_components/CreateSessionForm";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { EventClickArg } from "@fullcalendar/core/index.js";
import SessionModal from "../modals/sessionModal";
import { SessionWithLiders } from "@/type";
import { Volunteer } from "@/generated/prisma";

interface CalendarProps {
  sessions: SessionWithLiders[];
  isReduce?: boolean;
}

const CalendarWithSessions = ({ isReduce, sessions }: CalendarProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(
    undefined
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const showSessionDialogRef = useRef<HTMLDialogElement>(null);
  const isMobile = window.innerWidth < 768;

  // Transforme les sessions en events FullCalendar
  const events = sessions?.map((s: SessionWithLiders) => ({
    id: String(s.id),
    title: s.title,
    start: s.date,
    extendedProps: {
      type: s.type,
      liders: s.liders,
    },
  }));

  useEffect(() => {
    if (isModalOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (sessionSelected !== undefined) {
      showSessionDialogRef.current?.showModal();
    }
  }, [sessionSelected]);

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  const handleEventClick = (info: EventClickArg) => {
    const sessionId = parseInt(info.event.id);
    router.push(`/admin/sessions/${sessionId}`)
  };
    // setSessionSelected(sessionId);


  const handleCloseModal = () => {
    setSessionSelected(undefined);
    dialogRef.current?.close();
  };

  return (
    sessions && (
      <div className="w-full h-auto m-auto">
        <FullCalendar
          locale={esLocale}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView={isMobile || isReduce ? "listWeek" : "dayGridMonth"}
          headerToolbar={{
            left: isMobile ? "" : "today",
            center: "title",
            right:
              isMobile || isReduce
                ? "prev,next"
                : "prev,next dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          selectable={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          dayMaxEventRows={true}
          fixedWeekCount={true}
          contentHeight="auto"
          eventDidMount={(info) => {
            const liders = info.event.extendedProps.liders;
            if (liders?.length) {
              const names = liders
                .map((l: Volunteer) => l.firstName.toLowerCase())
                .join(", ");
              const namesEl = document.createElement("div");
              namesEl.className = "text-xs font-semibold text-myorange mt-1";
              namesEl.innerText = names;

              const possibleTargets = [
                ".fc-event-title", // dayGridMonth (desktop)
                ".fc-event-title-container", // timeGridWeek/Day
                ".fc-list-event-title", // listWeek / listDay (mobile)
              ];


              for (const selector of possibleTargets) {
                const target = info.el.querySelector(selector);
                if (target) {
                  target.appendChild(namesEl);
                  target.classList.add("ml-2");
                  break;
                }
              }

              info.el.classList.add("cursor-pointer");
            }
          }}
        />

        {isReduce && (
          <div className=" mt-5 w-full flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-start gap-3 cursror-pointer"
            >
              <i className="fa-solid fa-plus bg-myorange rounded-full text-white w-5 h-5 flex items-center justify-center"></i>
              <span className="text-myzinc underline font-semibold">
                Crear evento
              </span>
            </button>
          </div>
        )}

        {isModalOpen && (
          <dialog ref={dialogRef} id="my_modal_3" className="modal">
            <div className="modal-box bg-white h-full w-full lg:h-4/5">
              <form method="dialog">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-sm btn-circle btn-ghost text-zinc-400 absolute right-2 top-2 py-1 px-2"
                >
                  ✕
                </button>
              </form>
              <CreateSessionForm date={selectedDate} closeModal={handleCloseModal} />
            </div>
          </dialog>
        )}

        {sessionSelected && (
          <SessionModal
            sessionId={sessionSelected}
            dialogRef={showSessionDialogRef}
            isAdmin={true}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    )
  );
};

export default CalendarWithSessions;

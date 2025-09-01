import { ArrowLeft, CaretLeft, CaretRight, PencilSimple, TrashSimple, Wallet } from "phosphor-react";
import { useLiveQuery } from "dexie-react-hooks";
import { useOutletContext } from "react-router-dom";
import { format, addMonths, subMonths } from "date-fns";
import { useEffect, useRef, useState } from "react";
import db from "../db";

// Page
const Home = () => {
  const data = useLiveQuery(() => db.expense.toArray(), []);
  const { openEditModal, date, setDate } = useOutletContext();
  const [isHold, setIsHold] = useState(false)
  const [checkId, setCheckId] = useState([])

  useEffect(() => {
    console.log(checkId)
  }, [checkId])

  const filteredData = data?.filter(item => item.date === format(date, "MMMM yyyy"));
  const totalExpenses = filteredData?.reduce((sum, item) => sum + item.amount, 0) || 0;

  const handlePrevMonth = () => setDate(subMonths(date, 1));
  const handleNextMonth = () => setDate(addMonths(date, 1));

  const timerRef = useRef(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => setIsHold(true), 600);
  };

  const handleMouseUp = () => (clearTimeout(timerRef.current));
  const handleMouseLeave = () => clearTimeout(timerRef.current);


  const handleEdit = (e) => {
    e.stopPropagation();
    openEditModal(item);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-3 select-none">
      <header className="w-full h-14 flex items-center">
        {!isHold ? <h1 className="text-2xl font-bold">MoneyHabits</h1> :
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowLeft size={32} onClick={() => setIsHold(false)} />
              <h1 className="font-medium text-xl">{checkId.length}</h1>
            </div>
            <TrashSimple className="text-red-500" size={25} weight="fill" onClick={async () => (await db.expense.bulkDelete(checkId), setIsHold(false), setCheckId([]))} />
          </div>
        }
      </header>

      <div className="mt-5 flex items-center rounded-2xl px-3 py-5 text-white shadow-lg bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600">
        <Wallet className="mr-2" size={32} weight="fill" />
        <div>
          <p className="text-sm/5 opacity-90">Total expenses</p>
          <h2 className="text-3xl font-bold">Rp {totalExpenses.toLocaleString("id-ID")}</h2>
        </div>
      </div>

      <div className="mt-10 gap-2 text-sm font-semibold flex p-2 items-center justify-between w-full">
        <button onClick={handlePrevMonth}><CaretLeft size={32} /></button>
        <h1>{format(date, "MMMM yyyy")}</h1>
        <button onClick={handleNextMonth}><CaretRight size={32} /></button>
      </div>

      <ul>
        {filteredData?.map(item => (
          <li className="flex w-full items-center gap-2 mt-5" key={item.id}>
            <input onChange={(e) => e.target.checked ? setCheckId(prev => [...prev, item.id]) : setCheckId(prev => prev.filter(i => i !== item.id))} className={`${isHold ? "block" : "hidden"}`} type="checkbox" />
            <li
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onTouchCancel={handleMouseLeave}
              className="flex-1  flex items-center justify-between rounded-2xl px-3 py-5 text-black bg-white shadow"
            >
              <div className="flex items-center">
                <Wallet className="mr-5 bg-red-500 rounded-full p-2 text-white" size={32} weight="fill" />
                <div>
                  <h2 className="text-lg font-bold">Rp {item.amount.toLocaleString("id-ID")}</h2>
                  <p className="text-sm opacity-90">{item.title}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <PencilSimple size={25} weight="fill" onClick={handleEdit} />
              </div>
            </li>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
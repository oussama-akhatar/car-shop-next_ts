'use client'


import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ searchParams }: { searchParams: any }) {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);


  // Search state
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

  // Filter state
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2022)

  // pagination state
  const [limit, setLimit] = useState(10)


  const getCars = async () => {
    setLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });

      setAllCars(result)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, manufacturer, model, limit])




  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars


  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {
          loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <div className="lds_dual_ring"></div>
            </div>
          ) :
            allCars.length > 0 ? (
              <section>
                <div className="home__cars-wrapper">
                  {
                    allCars?.map((car) => <CarCard car={car} />)
                  }
                </div>

                <ShowMore
                  pageNumber={limit / 10}
                  isNext={limit > allCars.length}
                  setLimit={setLimit}
                />
              </section>
            ) : (
              <div className="home__error-container">
                <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              </div>
            )
        }
      </div>
    </main>
  )
}

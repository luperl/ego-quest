"use client";
import { HeaderNavigation } from "@/components/header-navigation";
import { listCards } from "@/data/indext";
import { useState } from "react";

const Card = ({ name, description }: { name: string; description: string }) => {
  return (
    <div className="space-y-4 mt-2">
      <div className="bg-white dark:bg-slate-800/50 dark:hover:bg-slate-900/50 transition  p-6 rounded-lg shadow-sm  h-[-webkit-fill-available]">
        <h2 className="text-xl font-bold font-serif-display text-primary mb-2">
          {name}
        </h2>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const NotFoundCard = () => {
  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-sm text-center flex flex-col items-center justify-center mt-8">
      <span className="material-symbols-outlined text-5xl text-primary mb-4">
        search_off
      </span>
      <h3 className="text-lg font-bold font-serif-display text-text-light-primary dark:text-text-dark-primary mb-1">
        Nenhum resultado encontrado
      </h3>
      <p className="text-text-light-secondary dark:text-text-dark-secondary text-base leading-relaxed">
        Tente ajustar os termos da sua busca.
      </p>
    </div>
  );
};

interface SimpleMerchinisms {
  name: string;
  description: string;
}
export default function AboutMechanismsPage() {
  const listInitialMerchinisms: Array<SimpleMerchinisms> =
    listCards.defenseMechanisms.map((mechanisms) => {
      return {
        name: mechanisms.name,
        description: mechanisms.description,
      };
    });

  const sortListByName = (a: SimpleMerchinisms, b: SimpleMerchinisms) =>
    a.name.localeCompare(b.name);

  const [listMerchinisms, setListMerchinisms] = useState(
    listInitialMerchinisms.sort(sortListByName)
  );
  const [inputFilter, setInputFilter] = useState("");

  const handleFilterMechanisms = (filter: string) => {
    setInputFilter(filter);
    setListMerchinisms(
      listInitialMerchinisms
        .filter((mechanism) =>
          mechanism.name.toLowerCase().includes(filter.toLowerCase())
        )
        .sort(sortListByName)
    );
  };
  return (
    <div className="relative flex h-auto lg:p-6 min-h-screen mx-auto w-full container flex-col group/design-root  text-slate-800 dark:text-slate-200">
      <HeaderNavigation title="Mecanismos de Defesa" />

      <div className="relative my-8">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary text-2xl">
          search
        </span>
        <input
          className="w-full h-14 pl-12 pr-4 rounded-lg bg-white dark:bg-slate-800/50 border-none text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary focus:ring-2 focus:ring-primary shadow-sm"
          placeholder="Buscar por nome..."
          type="text"
          value={inputFilter}
          onChange={(e) => {
            handleFilterMechanisms((e.target as HTMLInputElement).value);
          }}
        />
      </div>

      <div className="mb-8">
        {listMerchinisms.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-3  gap-3  ">
            {listMerchinisms.map((mechanism, index) => (
              <Card
                key={index}
                name={mechanism.name}
                description={mechanism.description}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            <NotFoundCard />
          </div>
        )}
      </div>
    </div>
  );
}

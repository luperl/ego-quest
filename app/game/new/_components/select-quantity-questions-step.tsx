import { useState } from "react";
import { Button } from "@heroui/button";
import { GenericContainerProps } from "../_interfaces/generic-container-props";
import { Container } from "./container";
import {
  CardsQuantityQuestion,
  CardsQuantityQuestionProps,
} from "./card-quantity-question";

interface SelectQuantityQuestionsStepProps extends GenericContainerProps {
  onSetQuantityQuestions: (quantity: number) => void;
  onConfirm: () => void;
}

export const SelectQuantityQuestionsStep = ({
  goBack,
  onSetQuantityQuestions,
  onConfirm,
}: SelectQuantityQuestionsStepProps) => {
  const initialOptions: Array<CardsQuantityQuestionProps> = [
    // {
    //   quantity: 2,
    //   text: "Partida Muito rapida Rápida",
    //   isActive: false,
    //   onClick: () => handleOnClickCard(2),
    // },
    {
      quantity: 10,
      text: "Partida Rápida",
      isActive: true,
      onClick: () => handleOnClickCard(10),
    },
    {
      quantity: 20,
      text: "Padrão",
      isActive: false,
      onClick: () => handleOnClickCard(20),
    },
    {
      quantity: 30,
      text: "Desafio Longo",
      isActive: false,
      onClick: () => handleOnClickCard(30),
    },
  ];

  const [listOptions, setListOptions] =
    useState<Array<CardsQuantityQuestionProps>>(initialOptions);

  const handleOnClickCard = (quantity: number) => {
    setListOptions((prev) =>
      prev.map((option) => ({
        ...option,
        isActive: option.quantity === quantity,
      }))
    );
    onSetQuantityQuestions(quantity);
  };

  return (
    <Container>
      <Container.Header
        onClickButton={goBack}
        title="Quantas perguntas?"
      ></Container.Header>

      <Container.Main>
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-medium leading-normal text-slate-500 dark:text-slate-400">
              Escolha uma opção rápida
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {listOptions.map((option, index) => (
                <CardsQuantityQuestion key={index} {...option} />
              ))}
            </div>
          </div>
          {/* <div className="flex flex-col gap-4">
            <h2 className="text-base font-medium leading-normal text-slate-500 dark:text-slate-400">
              Ou personalize
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white dark:bg-slate-800/50 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
              <div className="flex items-center justify-between w-full">
                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
                  Número de perguntas:
                </p>
                <p className="text-2xl font-bold leading-tight tracking-[-0.015em] text-primary dark:text-white">
                  10
                </p>
              </div>
              <input
                className="w-full h-2 bg-primary/20 rounded-full appearance-none cursor-pointer accent-primary"
                max="50"
                min="5"
                type="range"
                value="10"
              />
            </div>
          </div> */}
        </div>
        <div className="mt-auto pt-6 pb-4">
          <Button
            onPress={onConfirm}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-white text-base font-medium leading-normal hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors"
          >
            <span className="truncate">Confirmar e Iniciar</span>
          </Button>
        </div>
      </Container.Main>
    </Container>
  );
};

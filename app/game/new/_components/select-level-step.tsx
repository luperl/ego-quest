import {
  LevelGameCard,
  LevelGameCardProps,
} from "@/components/level-game-card";
import { GenericContainerProps } from "../_interfaces/generic-container-props";
import { Container } from "./container";
import { Button } from "@heroui/button";

interface SelectLevelStepProps extends GenericContainerProps {
  levelButtons: Array<LevelGameCardProps>;
}

export const SelectLevelStep = ({
  goBack,
  levelButtons,
}: SelectLevelStepProps) => {
  return (
    <Container>
      <Container.Header>
        <Button
          onPress={goBack}
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-slate-700 dark:text-slate-300"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Escolha o seu desafio
        </h1>
      </Container.Header>

      <Container.Main>
        {levelButtons.map((level, index) => (
          <LevelGameCard key={index} {...level} />
        ))}
      </Container.Main>
    </Container>
  );
};

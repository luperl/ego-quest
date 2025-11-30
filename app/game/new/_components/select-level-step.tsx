import {
  LevelGameCard,
  LevelGameCardProps,
} from "@/components/level-game-card";
import { GenericContainerProps } from "../_interfaces/generic-container-props";
import { Container } from "./container";

interface SelectLevelStepProps extends GenericContainerProps {
  levelButtons: Array<LevelGameCardProps>;
}

export const SelectLevelStep = ({
  goBack,
  levelButtons,
}: SelectLevelStepProps) => {
  return (
    <Container>
      <Container.Header
        onClickButton={goBack}
        title="Escolha o seu desafio"
      ></Container.Header>

      <Container.Main>
        {levelButtons.map((level, index) => (
          <LevelGameCard key={index} {...level} />
        ))}
      </Container.Main>
    </Container>
  );
};

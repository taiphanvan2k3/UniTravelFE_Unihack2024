/* eslint-disable react/prop-types */
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { Container, Flex, Stack } from "@chakra-ui/react";

const Carousel = ({ children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
    return (
        <Stack>
            <div className="max-w-full">
                <Container width={"500px"} ref={emblaRef} overflow={"hidden"}>
                    <div className="gap-6 flex">{children}</div>
                </Container>
            </div>
            <Flex justifyContent={"end"} alignItems={"center"} gap={3}>
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </Flex>
        </Stack>
    );
};

export default Carousel;

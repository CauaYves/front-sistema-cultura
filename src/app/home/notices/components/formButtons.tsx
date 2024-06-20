import { BackButton, ButtonWrapper, SaveBtn } from '@/components';
import { ButtonBox } from '../[id]/styles';

export default function FormButtons() {
    return (
        <ButtonBox>
            <ButtonWrapper>
                <BackButton onClick={() => history.back()}>Anterior</BackButton>
                <SaveBtn />
            </ButtonWrapper>
        </ButtonBox>
    );
}

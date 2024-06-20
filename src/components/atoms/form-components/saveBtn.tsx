import { useFormStatus } from 'react-dom';
import { SaveButton } from '.';

function SaveBtn() {
    const { pending } = useFormStatus();
    return (
        <SaveButton type="submit" disabled={pending}>
            Próximo
        </SaveButton>
    );
}
export { SaveBtn };

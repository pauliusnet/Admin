import { TrickDto } from '../../../api';

export interface UpdateTrickDialogProps {
    onClose: () => void;
    trickData: TrickDto;
}

export interface UpdateTrickDialogFormInputs {
    name: string;
    level: number;
    videoURL: string;
}

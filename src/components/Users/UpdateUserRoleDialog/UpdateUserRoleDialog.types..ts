import { UserRole } from '../../../api/generated-api';

export interface UpdateUserRoleDialogProps {
    onClose: () => void;
}

export interface UpdateUserRoleDialogFormInputs {
    email: string;
    role: UserRole;
}

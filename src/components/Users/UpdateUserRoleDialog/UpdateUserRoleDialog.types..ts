import { UserRole } from '../../../api/generated-api';

export interface UpdateUserRoleDialogProps {
    userData: { email: string; role: UserRole };
    onClose: () => void;
}

export interface UpdateUserRoleDialogFormInputs {
    role: UserRole;
}

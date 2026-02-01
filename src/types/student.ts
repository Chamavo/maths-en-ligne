export interface Student {
    id: string;
    first_name: string;
    last_name: string;
    display_name: string;
    level: number;
    username?: string;
    password_hash?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    created_by?: string | null;
}

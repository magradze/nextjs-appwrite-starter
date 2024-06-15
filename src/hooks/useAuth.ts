import {useQuery} from "@tanstack/react-query";
import { redirect } from 'next/navigation';
import { useMutation } from 'react-query';
import { getLoggedInUser, logOut } from '@/lib/server/appwrite';

export const useLogOut = () => {

};
// import {useQuery} from "@tanstack/react-query";
import { redirect } from 'next/navigation';
import { useMutation } from 'react-query';

// const useAuth = () => {
//   const {data, isLoading, error} = useQuery("user", async () => {
//     const res = await fetch("/api/auth/me");
//     return res.json();
//   });

//   return {
//     user: data,
//     isLoading,
//     error,
//   };
// };

// export const useLogOut = () => {
//   return useQuery(
//     {
//       queryKey: ["logout"], // Wrap the string value in an array
//       queryFn: async () => {
//         const res = await fetch("/api/auth/signout", {
//           method: "POST",
//         });
//         return res.json();
//       },
//     }
//   )
// }

// export const useLogOut = () => {
//   return useMutation(async () => {
//     const res = await fetch("http://localhost:3000/api/auth/signout", {
//       method: "POST",
//     });
//     return res.json();
//   });
// }

export const useLogOut = () => {

  // return useMutation(async () => {
  //   await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/signout`, {
  //     method: "POST",
  //   });
  // }, {
  //   onSuccess: async() => {
  //     console.log('Logged out');
  //     // redirect to home page
  //     redirect('/');
  //   },
  //   onError: () => {
  //     console.error('Failed to log out');
  //   }
  // });

  return useMutation({
    mutationFn: async () => {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/signout`, {
        method: "POST",
      });
      // return res.json();
    }
  })
};
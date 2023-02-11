import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ListItemButton } from '@mui/material';

export default function ListItemLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <ListItemButton component={Link} href={href} selected={href === path}>
      {children}
    </ListItemButton>
  );
}

import React from 'react'
import { validateRequest } from '@/lib/auth'
import { redirect } from 'next/navigation';

async function page() {
	const { session } = await validateRequest();
	if (!session) redirect('/login');

	return (
		<div>protedted route</div>
	)
}

export default page
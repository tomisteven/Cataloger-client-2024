import React from 'react'

export default function DeleteModal({title, description, action, id}) {
  return (
    <div class="w-full md:w-1/3 mx-auto">
  <div class="flex flex-col p-5 rounded-lg shadow bg-white">
	<div class="flex">
	  <div>
		<svg class="w-6 h-6 fill-current text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>
	  </div>

	  <div class="ml-3">
		<h2 class="font-semibold text-gray-800">Delete Alert Title With Large Action</h2>
		<p class="mt-2 text-sm text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum impedit ipsam nam quam! Ab accusamus aperiam distinctio doloribus, praesentium quasi reprehenderit soluta unde?</p>
	  </div>
	</div>

	<div class="flex items-center mt-3">
	  <button class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
		Cancel
	  </button>

	  <button class="flex-1 px-4 py-2 ml-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
		Delete
	  </button>
	</div>
  </div>
</div>
  )
}

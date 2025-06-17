export const LOGO_URL = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const USER_AVATAR = "https://occ-0-2873-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXh10ggeTTdhZO1JIH_SNQ4gp0vsNnWfE8Mg2ckwzGvUzJMRpPFCujRK3Ex5K9VbkIyvUHQ92LBVdsemkj6zlpquL-qWMCNKeg.png?r=229"

export const API_OPTIONS ={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY
    }
  };

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/"

export const LOGIN_BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg"


export const langConst = [
  { value: 'en', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'es', label: 'Spanish' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
  
  
];

export const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#1f2937',
    height: '35px',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#6b7280' : '#4b5563',
    boxShadow: state.isFocused ? '0 0 0 1px #6b7280' : 'none',
    '&:hover': {
      borderColor: '#6b7280',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1f2937',
    zIndex: 9999, // fixes dropdown not appearing over other elements
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#4b5563' : '#1f2937',
    color: 'white',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#374151',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af', // Tailwind's text-gray-400
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
    '&:hover': {
      color: '#d1d5db', // Tailwind's text-gray-300
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

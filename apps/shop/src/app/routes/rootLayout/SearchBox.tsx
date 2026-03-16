import { FormProvider, useForm } from 'react-hook-form';
import { SearchInput } from '@org/shared-ui';

const SearchBox = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <SearchInput
        name="search"
        placeholder="Search for products, brands, and more..."
      />
    </FormProvider>
  );
};

export default SearchBox;

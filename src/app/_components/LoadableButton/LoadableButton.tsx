import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

interface OwnProps {
  className?: string | undefined;
  disabled: boolean;
  isLoading: boolean;
}

export const LoadableButton = (props: OwnProps) => {
  const { className, disabled, isLoading } = props;
  return (
    <Button className={className} disabled={disabled} type="submit">
      {isLoading ? (
        <React.Fragment>
          <LoaderCircle className="mr-2 size-5 animate-spin" />
          <span>Please wait...</span>
        </React.Fragment>
      ) : (
        <span>Submit</span>
      )}
    </Button>
  );
};

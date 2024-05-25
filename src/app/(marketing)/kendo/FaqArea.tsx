import type { KendoPage } from '@/src/payload-types';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

interface OwnProps {
  faqs: KendoPage['faqs'];
}
export const FaqArea = (props: OwnProps) => {
  const { faqs } = props;

  const faqList = faqs?.map((faq) => {
    const { description, title } = faq;
    return (
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{description}</AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <div className="w-full px-8 py-14 lg:px-14">
      <h1>FAQ</h1>
      <Accordion collapsible type="single">
        {faqList}
      </Accordion>
    </div>
  );
};

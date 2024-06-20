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
      <AccordionItem key={`kendo-page-faq-${faq.title}`} value={title}>
        <AccordionTrigger className="">{title}</AccordionTrigger>
        <AccordionContent className="whitespace-pre-wrap">
          {description}
        </AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <div className="w-full px-8 py-5 lg:p-14">
      <h1 className="font-bold">FAQ</h1>
      <Accordion collapsible type="single">
        {faqList}
      </Accordion>
    </div>
  );
};

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AccordionItem from '../AccordionItem';
import { accordionData } from './mocks/accordionData';

vi.mock('@/features/Markdown', () => ({
  Markdown: ({ path, file }) => <div data-testid="markdown">{`${path}/${file}`}</div>,
}));

vi.mock('@/components/display/', () => ({
  TimelineNode: ({ isActive, isFirst }) => (
    <div data-testid="timeline-node" data-active={isActive} data-first={isFirst} />
  ),
}));

describe('AccordionItem component', () => {
  test('renders accordion item with complete information', () => {
    render(<AccordionItem item={accordionData[0]} isFirst={true} isLast={false} />);

    expect(screen.getByText(accordionData[0].title)).toBeInTheDocument();
    expect(screen.getByText(accordionData[0].company)).toBeInTheDocument();
    expect(screen.getByText(accordionData[0].date)).toBeInTheDocument();

    const timelineNode = screen.getByTestId('timeline-node');
    expect(timelineNode).toHaveAttribute('data-active', 'true');
    expect(timelineNode).toHaveAttribute('data-first', 'true');

    expect(screen.getByTestId('markdown')).toHaveTextContent(
      `${accordionData[0].path}/${accordionData[0].filename}`
    );
  });

  test('expands and collapses on button click', async () => {
    const user = userEvent.setup();
    render(<AccordionItem item={accordionData[0]} isFirst={true} isLast={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

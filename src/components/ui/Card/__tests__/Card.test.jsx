import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

import { Card } from '../..';
import { cardData } from './mocks/cardData';
import { MEDIA_TYPES } from '@/lib/constants';

vi.mock('../../Tooltip', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

describe('Card component', () => {
  test('renders project information', () => {
    render(<Card project={cardData} index={0} />);

    expect(screen.getByText(cardData.title)).toBeInTheDocument();
    expect(screen.getByText(cardData.description)).toBeInTheDocument();

    const thumbnail = screen.getByAltText(cardData.title);
    expect(thumbnail).toHaveAttribute('src', cardData.thumbnail);
  });

  test('renders project links', () => {
    render(<Card project={cardData} index={0} />);

    const projectLink = screen.getByLabelText(`View ${cardData.title} project`);
    expect(projectLink).toHaveAttribute('href', cardData.link);
    expect(projectLink).toHaveAttribute('target', '_blank');

    const githubLink = screen.getByLabelText(/open the github repository/i);
    expect(githubLink).toHaveAttribute('href', cardData.github);
  });

  test('handles hover interactions', async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    render(
      <Card project={cardData} index={0} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    );

    const card = screen.getByText(cardData.title).closest('div[class*="group"]');

    await user.hover(card);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    await user.unhover(card);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  test('renders with video preview type', () => {
    const project = {
      ...cardData,
      preview: 'https://example.com/video.mp4',
      previewType: MEDIA_TYPES.VIDEO,
    };

    render(<Card project={project} index={0} />);

    expect(screen.getByText(cardData.title)).toBeInTheDocument();
  });

  test('renders without preview', () => {
    const noPreviewProject = { ...cardData, preview: null };

    render(<Card project={noPreviewProject} index={0} />);

    expect(screen.getByText(cardData.title)).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1); // only thumbnail
  });
});

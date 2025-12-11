import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tile from '../Tile';
import { tileData } from './mocks/tileData';

describe('Tile component', () => {
  test('renders children when provided', () => {
    render(
      <Tile>
        <div>children</div>
      </Tile>
    );

    expect(screen.getByText('children')).toBeInTheDocument();
  });

  test('renders image with correct attributes', () => {
    render(<Tile src={tileData.image} title={tileData.title} />);

    const img = screen.getByAltText(tileData.title);
    expect(img).toHaveAttribute('src', tileData.image);
  });

  test('renders as interactive button when onClick provided', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Tile src={tileData.image} title={tileData.title} onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'View image' });
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('displays caption on hover', async () => {
    const user = userEvent.setup();

    render(
      <Tile
        src={tileData.image}
        title={tileData.title}
        caption={tileData.caption}
        onClick={vi.fn()}
      />
    );

    const button = screen.getByRole('button');
    await user.hover(button);

    expect(screen.getByText(tileData.caption)).toBeInTheDocument();
  });
});

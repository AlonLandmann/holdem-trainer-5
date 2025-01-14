# Hold'em Trainer

## Manage your strategies

On Hold'em Trainer you can create ranges for any spot that is reachable with in a 6-max cash-game format (other formats will be supported soon).
You can build an manage these ranges easily in the range manager section of the application.

![Manager](public/screenshots/manager.png)

## Edit your strategies down to the last detail

A range in poker is the answer to one of the following two questions.

1. What are the possible hands I or my opponent are likely to have in any given scenario?
2. What should I be doing with the different hands I could have in this scenario?

Hold'em Trainer lets you manage your strategies by allowing you to define a given scenario first by defining initial stack sizes and then defining the action history including possible board cards.
It also allows you to link different ranges with overlapping histories together that have overlapping histories, so that previous actions in the same position can follow each other and be taken into account properly.

You can then define the different actions you want to take in this spot with each holding by working with the brush tool.
The matrix in the middle contains a grid of all possible two-card combinations you could be holding in your hand.
The bottom-right cells tell you with what frequency you reach this particular spot with a particular hand and the top-right cells allow you to display the actions you would like to take.
The tool allows you to define mixed strategies as well, meaning that you intend to obt for certain actions some of the time, and for others the other times.

The right-hand side panel gives a detailed break-down of the different hand-strengths categories that your range will break into pre- and post-flop.
Hovering over any hand category or previously applied strategy-brush will highlight all corresponding combos.

![Editor-Full](public/screenshots/editor-full.png)

## Train them until they are second nature

![Trainer](public/screenshots/trainer.png)


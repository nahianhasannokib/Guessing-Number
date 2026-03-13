import time

print("AI Mind Reader")
time.sleep(1)

print("\nThink of a number between 1 and 100")
input("Press Enter when you have your number...")

low = 1
high = 100
guesses = 0

while low < high:
    mid = (low + high) // 2
    guesses += 1

    answer = input(f"\nIs your number greater than {mid}? (y/n): ").lower()

    if answer == "y":
        low = mid + 1
    elif answer == "n":
        high = mid
    else:
        print("Please enter y or n")

print("\nAI Prediction Completed")
print("Your number is:", low)
print("Guessed in", guesses, "steps!")
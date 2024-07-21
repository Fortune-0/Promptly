import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Create a figure and axis
fig, ax = plt.subplots(figsize=(8, 6))
ax.set_xlim(0, 100)
ax.set_ylim(0, 100)
ax.axis('off')

# Header
ax.add_patch(patches.Rectangle((10, 85), 80, 10, edgecolor='black', facecolor='#4A90E2'))
ax.text(50, 90, 'Promptly', fontsize=20, ha='center', va='center', color='white')

# Task Input Section
ax.text(15, 75, 'Task:', fontsize=14, ha='left', va='center')
ax.add_patch(patches.Rectangle((25, 70), 60, 7, edgecolor='black', facecolor='white'))

ax.text(15, 60, 'Date:', fontsize=14, ha='left', va='center')
ax.add_patch(patches.Rectangle((25, 55), 25, 7, edgecolor='black', facecolor='white'))
ax.text(15, 45, 'Time:', fontsize=14, ha='left', va='center')
ax.add_patch(patches.Rectangle((25, 40), 25, 7, edgecolor='black', facecolor='white'))

# Add Reminder Button
ax.add_patch(patches.Rectangle((60, 30), 30, 10, edgecolor='black', facecolor='#4A90E2'))
ax.text(75, 35, 'Add Reminder', fontsize=14, ha='center', va='center', color='white')

# Reminder List Section
ax.add_patch(patches.Rectangle((10, 10), 80, 15, edgecolor='black', facecolor='white'))
ax.text(15, 20, 'Task 1 - 2024-07-11 - 10:00 AM', fontsize=12, ha='left', va='center')
ax.text(15, 15, 'Task 2 - 2024-07-12 - 12:00 PM', fontsize=12, ha='left', va='center')

plt.show()

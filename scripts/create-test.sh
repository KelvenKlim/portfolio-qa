#!/bin/bash

# Test Generator Script
# Usage: ./create-test.sh <type> <path> <name>
# Example: ./create-test.sh component landing/About About
# Example: ./create-test.sh unit hooks/use-theme use-theme

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Validate arguments
if [ $# -lt 3 ]; then
    print_error "Missing arguments!"
    echo ""
    echo "Usage: ./create-test.sh <type> <path> <name>"
    echo ""
    echo "Types: unit, component, integration"
    echo ""
    echo "Examples:"
    echo "  ./create-test.sh component landing/About About"
    echo "  ./create-test.sh unit hooks/use-theme use-theme"
    echo "  ./create-test.sh integration pages/Index Index"
    exit 1
fi

TYPE=$1
PATH_PART=$2
NAME=$3

# Validate type
if [[ ! "$TYPE" =~ ^(unit|component|integration)$ ]]; then
    print_error "Invalid type: $TYPE"
    echo "Valid types: unit, component, integration"
    exit 1
fi

# Determine file extension
EXT=".test.ts"
if [[ "$NAME" == *[A-Z]* ]]; then
    EXT=".test.tsx"
fi

# Create directory path
TEST_DIR="src/test/$TYPE/$PATH_PART"
TEST_FILE="$TEST_DIR/$NAME$EXT"
SOURCE_DIR="src/${PATH_PART#*/}"

# Check if test already exists
if [ -f "$TEST_FILE" ]; then
    print_error "Test file already exists: $TEST_FILE"
    exit 1
fi

# Create directory if it doesn't exist
mkdir -p "$TEST_DIR"
print_success "Created directory: $TEST_DIR"

# Generate test template based on type
if [ "$TYPE" == "unit" ]; then
    cat > "$TEST_FILE" << EOF
import { describe, it, expect, beforeEach } from 'vitest';
import { /* import your function/hook */ } from '@/$PATH_PART';

describe('$PATH_PART', () => {
  beforeEach(() => {
    // Setup
  });

  describe('Functionality', () => {
    it('should work correctly', () => {
      // Arrange
      
      // Act
      
      // Assert
      expect(true).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle edge cases', () => {
      // Test edge cases
    });
  });
});
EOF
elif [ "$TYPE" == "component" ]; then
    cat > "$TEST_FILE" << EOF
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import $NAME from '@/$PATH_PART/$NAME';

describe('$PATH_PART/$NAME', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render correctly', () => {
      render(<$NAME />);
      
      // Add assertions
    });
  });

  describe('Functionality', () => {
    it('should handle user interaction', () => {
      render(<$NAME />);
      
      // Add interaction tests
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      render(<$NAME />);
      
      // Add accessibility tests
    });
  });
});
EOF
else
    cat > "$TEST_FILE" << EOF
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';

describe('$PATH_PART - Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Full Flow', () => {
    it('should complete the flow successfully', () => {
      // Test full user flow
    });
  });

  describe('Error Handling', () => {
    it('should handle errors gracefully', () => {
      // Test error scenarios
    });
  });
});
EOF
fi

print_success "Created test file: $TEST_FILE"

# Print next steps
echo ""
print_info "Next steps:"
echo "  1. Open the test file: code $TEST_FILE"
echo "  2. Implement your test cases"
echo "  3. Run tests: npm test -- $NAME"
echo ""
print_info "Test structure created successfully! 🎉"
EOF

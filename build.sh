#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command_exists java; then
        print_error "Java is not installed. Please install Java JDK first."
        exit 1
    fi
    
    if ! command_exists adb; then
        print_warning "ADB is not found in PATH. Android debugging may not work."
    fi
    
    print_success "Prerequisites check completed."
}

# Function to clean project
clean_project() {
    print_status "Cleaning project..."
    
    # Clean npm
    npm run clean 2>/dev/null || true
    
    # Clean Android
    cd android
    ./gradlew clean
    cd ..
    
    print_success "Project cleaned successfully."
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    if [ -f "yarn.lock" ]; then
        yarn install
    else
        npm install
    fi
    
    print_success "Dependencies installed successfully."
}

# Function to build APK
build_apk() {
    print_status "Building APK..."
    
    cd android
    
    # Build debug APK
    print_status "Building debug APK..."
    ./gradlew assembleDebug
    if [ $? -eq 0 ]; then
        print_success "Debug APK built successfully!"
        print_status "Debug APK location: android/app/build/outputs/apk/debug/app-debug.apk"
    else
        print_error "Failed to build debug APK"
        cd ..
        return 1
    fi
    
    # Build release APK
    print_status "Building release APK..."
    ./gradlew assembleRelease
    if [ $? -eq 0 ]; then
        print_success "Release APK built successfully!"
        print_status "Release APK location: android/app/build/outputs/apk/release/app-release.apk"
    else
        print_error "Failed to build release APK"
        cd ..
        return 1
    fi
    
    cd ..
    
    # Copy APK files to root level
    print_status "Copying APK files to root level..."
    if [ -f "android/app/build/outputs/apk/debug/app-debug.apk" ]; then
        cp android/app/build/outputs/apk/debug/app-debug.apk ./app-debug.apk
        print_success "Debug APK copied to root: ./app-debug.apk"
    fi
    
    if [ -f "android/app/build/outputs/apk/release/app-release.apk" ]; then
        cp android/app/build/outputs/apk/release/app-release.apk ./app-release.apk
        print_success "Release APK copied to root: ./app-release.apk"
    fi
    
    return 0
}

# Function to build AAB
build_aab() {
    print_status "Building AAB (Android App Bundle)..."
    
    cd android
    
    # Build release AAB
    ./gradlew bundleRelease
    if [ $? -eq 0 ]; then
        print_success "Release AAB built successfully!"
        print_status "Release AAB location: android/app/build/outputs/bundle/release/app-release.aab"
    else
        print_error "Failed to build release AAB"
        cd ..
        return 1
    fi
    
    cd ..
    
    # Copy AAB file to root level
    print_status "Copying AAB file to root level..."
    if [ -f "android/app/build/outputs/bundle/release/app-release.aab" ]; then
        cp android/app/build/outputs/bundle/release/app-release.aab ./app-release.aab
        print_success "Release AAB copied to root: ./app-release.aab"
    fi
    
    return 0
}

# Function to show build options
show_menu() {
    echo ""
    echo "=========================================="
    echo "           Dhanman Mobile Build Tool"
    echo "=========================================="
    echo ""
    echo "Select build option:"
    echo "1) Build APK (Debug + Release)"
    echo "2) Build AAB (Release only)"
    echo "3) Build both APK and AAB"
    echo "4) Clean project only"
    echo "5) Install dependencies only"
    echo "6) Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
}

# Function to check if keystore exists for release builds
check_keystore() {
    if [ ! -f "android/app/release.keystore" ]; then
        print_warning "Release keystore not found at android/app/release.keystore"
        print_status "For release builds, you need to:"
        print_status "1. Generate a release keystore: keytool -genkey -v -keystore android/app/release.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000"
        print_status "2. Set environment variables or update android/app/build.gradle with your keystore details:"
        print_status "   - KEYSTORE_PASSWORD"
        print_status "   - KEY_ALIAS" 
        print_status "   - KEY_PASSWORD"
        print_status "3. Or update the default values in android/app/build.gradle"
    fi
    
    if [ ! -f "android/app/debug.keystore" ]; then
        print_warning "Debug keystore not found. Debug builds may fail."
        print_status "Debug keystore should be at android/app/debug.keystore"
    fi
}

# Main execution
main() {
    echo ""
    print_status "Starting Dhanman Mobile build process..."
    
    # Check prerequisites
    check_prerequisites
    
    # Check keystore
    check_keystore
    
    # Show menu and get user choice
    show_menu
    
    case $choice in
        1)
            print_status "Building APK files..."
            clean_project
            install_dependencies
            build_apk
            if [ $? -eq 0 ]; then
                print_success "APK build completed successfully!"
            else
                print_error "APK build failed!"
                exit 1
            fi
            ;;
        2)
            print_status "Building AAB file..."
            clean_project
            install_dependencies
            build_aab
            if [ $? -eq 0 ]; then
                print_success "AAB build completed successfully!"
            else
                print_error "AAB build failed!"
                exit 1
            fi
            ;;
        3)
            print_status "Building both APK and AAB files..."
            clean_project
            install_dependencies
            build_apk
            if [ $? -eq 0 ]; then
                build_aab
                if [ $? -eq 0 ]; then
                    print_success "All builds completed successfully!"
                else
                    print_error "AAB build failed!"
                    exit 1
                fi
            else
                print_error "APK build failed!"
                exit 1
            fi
            ;;
        4)
            print_status "Cleaning project..."
            clean_project
            print_success "Project cleaned successfully!"
            ;;
        5)
            print_status "Installing dependencies..."
            install_dependencies
            print_success "Dependencies installed successfully!"
            ;;
        6)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please run the script again."
            exit 1
            ;;
    esac
    
    echo ""
    print_status "Build process completed!"
    echo ""
    print_status "Generated files:"
    if [ "$choice" = "1" ] || [ "$choice" = "3" ]; then
        echo "  - Debug APK: android/app/build/outputs/apk/debug/app-debug.apk"
        echo "  - Release APK: android/app/build/outputs/apk/release/app-release.apk"
        echo "  - Debug APK (root): ./app-debug.apk"
        echo "  - Release APK (root): ./app-release.apk"
    fi
    if [ "$choice" = "2" ] || [ "$choice" = "3" ]; then
        echo "  - Release AAB: android/app/build/outputs/bundle/release/app-release.aab"
        echo "  - Release AAB (root): ./app-release.aab"
    fi
    echo ""
}

# Run main function
main "$@" 
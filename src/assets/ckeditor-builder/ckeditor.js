/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import DecoupledDocumentEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import saveIcon from '@ckeditor/ckeditor5-core/theme/icons/save.svg';
import pdfIcon from '@ckeditor/ckeditor5-core/theme/icons/pdf.svg';
import decreaseIcon from '@ckeditor/ckeditor5-core/theme/icons/decrease.svg';
import expandIcon from '@ckeditor/ckeditor5-core/theme/icons/expand.svg';

/**
Plugins personalizzati
*/

class Save extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'save', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Save',
                icon: saveIcon,
                tooltip: true
            } );
			
			// Callback executed once the icon is clicked
		    view.on('execute', () => {
			   // fire a JS event
			   window.dispatchEvent(new Event('save_editor_content'));
		    });

            return view;
        } );
		
    }
}
class MyPdf extends Plugin {
    init() {
        const editor = this.editor;

       editor.ui.componentFactory.add( 'pdf', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Export to Pdf',
                icon: pdfIcon,
                tooltip: true
            } );
			
			// Callback executed once the icon is clicked
		    view.on('execute', () => {
			  // fire a JS event
			  window.dispatchEvent(new Event('pdf_editor_content'));
		    });

            return view;
        } );
		
    }
}
class AddPadding extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'add_padding', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Add Margin',
                icon: expandIcon,
                tooltip: true
            } );
			
			// Callback executed once the icon is clicked
		    view.on('execute', () => {
			  // fire a JS event
			  window.dispatchEvent(new Event('add_padding'));
		    });

            return view;
        } );
		
    }
}
class ReducePadding extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'reduce_padding', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Reduce Margin',
                icon: decreaseIcon,
                tooltip: true
            } );
			
			// Callback executed once the icon is clicked
		    view.on('execute', () => {
			  // fire a JS event
			  window.dispatchEvent(new Event('reduce_padding'));
		    });

            return view;
        } );
		
    }
}

class Editor extends DecoupledDocumentEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	Base64UploadAdapter,
	BlockQuote,
	Bold,
	CloudServices,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	ListStyle,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	SpecialCharacters,
	SpecialCharactersEssentials,
	Strikethrough,
	Table,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	Save,
	MyPdf,
	AddPadding,
	ReducePadding
	
];
Editor.defaultConfig = {
	toolbar: {
		items: ['save','pdf','|',
			'heading',
			'|',
			'fontfamily',
			'fontsize',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'alignment',
			'|',
			'numberedList',
			'bulletedList',
			'|',
			'outdent',
			'indent',
			'add_padding',
			'reduce_padding',
			'|',
			'link',
			'blockquote',
			'uploadImage',
			'insertTable',
			'mediaEmbed',
			'|',
			'undo',
			'redo',
			'selectAll',
			'|',
			'findAndReplace'
		]
	},
	fontFamily: {
            options: [
                'default',
				'Arial, Helvetica, sans-serif',
				'Courier New, Courier, monospace',
				'Times New Roman, Times, serif'
            ]
    },
	indentBlock: {
            offset: 1,
            unit: 'em'
    },
	image: {
		styles: [
			'alignCenter',
			'alignLeft',
			'alignRight'
		],
		toolbar: [
			'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
			'|','horizontalLine','pageBreak','specialCharacters','|',
			'resizeImage',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
	/*simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: 'http://172.29.10.206/app_service/img/uploaderImg.php',
			withCredentials: false,
	}*/
};

export default Editor;
